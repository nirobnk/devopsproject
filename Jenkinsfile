pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        FRONTEND_IMAGE = "niroz14/devops-frontend"
        BACKEND_IMAGE  = "niroz14/devops-backend"

        // Important for Homebrew tools (Ansible)
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Verify Tools') {
            steps {
                sh '''
                echo "PATH is: $PATH"
                which docker
                docker --version

                which ansible || true
                which ansible-playbook || true
                '''
            }
        }

        stage('Checkout Source') {
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

        stage('Build & Push Docker Images') {
            steps {
                sh '''
                echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login \
                  -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin

                # Backend image (for EC2 linux/amd64)
                docker build \
                  --platform linux/amd64 \
                  -t $BACKEND_IMAGE:latest \
                  ./backend

                # Frontend image
                docker build \
                  --platform linux/amd64 \
                  -t $FRONTEND_IMAGE:latest \
                  ./frontend

                docker push $BACKEND_IMAGE:latest
                docker push $FRONTEND_IMAGE:latest
                '''
            }
        }

        stage('Deploy to EC2 using Ansible') {
            steps {
                dir('ansible') {
                    sh '''
                    export PATH=/opt/homebrew/bin:$PATH
                    ansible-playbook -i inventory playbook.yml
                    '''
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