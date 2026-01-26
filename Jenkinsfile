pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        FRONTEND_IMAGE = "niroz14/devops-frontend"
        BACKEND_IMAGE = "niroz14/devops-backend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/nirobnk/devopsproject.git'
            }
        }

        stage('Build Backend JAR') {
            steps {
                dir('backend') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE:latest ./frontend'
                sh 'docker build -t $BACKEND_IMAGE:latest ./backend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh '''
                echo $DOCKERHUB_CREDENTIALS_PSW | docker login \
                  -u $DOCKERHUB_CREDENTIALS_USR --password-stdin

                docker push $FRONTEND_IMAGE:latest
                docker push $BACKEND_IMAGE:latest
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