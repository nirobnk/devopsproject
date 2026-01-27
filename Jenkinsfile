pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        FRONTEND_IMAGE = "niroz14/devops-frontend"
        BACKEND_IMAGE  = "niroz14/devops-backend"
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Verify Docker') {
            steps {
                sh '''
                which docker
                docker --version
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

        stage('Build & Push Docker Images') {
            steps {
                sh '''
                echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login \
                  -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin

                docker build --platform linux/amd64 \
                  -t $BACKEND_IMAGE:latest ./backend

                docker build --platform linux/amd64 \
                  -t $FRONTEND_IMAGE:latest ./frontend

                docker push $BACKEND_IMAGE:latest
                docker push $FRONTEND_IMAGE:latest
                '''
            }
        }

        stage('Deploy to EC2 using Ansible') {
            steps {
        dir('ansible') {
            sh '''
            # Check where ansible is located
            ANS_PATH=$(which ansible-playbook || echo "/opt/homebrew/bin/ansible-playbook")
            
            if [ -f "$ANS_PATH" ]; then
                "$ANS_PATH" -i inventory playbook.yml
            else
                echo "Ansible not found at $ANS_PATH. Trying manual PATH search..."
                ansible-playbook -i inventory playbook.yml
            fi
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