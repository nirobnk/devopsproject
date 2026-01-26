pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        FRONTEND_IMAGE = "niroz14/devops-frontend"
        BACKEND_IMAGE  = "niroz14/devops-backend"
    }

    stages {

        stage('Verify Docker') {
            steps {
                sh '''
                docker --version
                docker buildx version
                '''
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/nirobnk/devopsproject.git'
            }
        }

        stage('Build Backend JAR') {
            steps {
                dir('backend') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build & Push amd64 Docker Images') {
            steps {
                sh '''
                docker buildx create \
                  --name amd64builder \
                  --driver docker-container \
                  --use || docker buildx use amd64builder

                docker buildx inspect --bootstrap

                echo $DOCKERHUB_CREDENTIALS_PSW | docker login \
                  -u $DOCKERHUB_CREDENTIALS_USR --password-stdin

                docker buildx build \
                  --platform linux/amd64 \
                  -t $BACKEND_IMAGE:latest \
                  ./backend \
                  --push

                docker buildx build \
                  --platform linux/amd64 \
                  -t $FRONTEND_IMAGE:latest \
                  ./frontend \
                  --push
                '''
            }
        }

        stage('Deploy to EC2 using Ansible') {
            steps {
                dir('ansible') {
                    sh 'ansible-playbook -i inventory playbook.yml'
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo '🚀 CI/CD Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs.'
        }
    }
}