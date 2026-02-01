pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
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
        stage('Cleanup Docker Images') {
            steps {
                sh '''
                docker rmi $BACKEND_IMAGE:latest || true
                docker rmi $FRONTEND_IMAGE:latest || true
                docker system prune -f
                '''
            }
        }
        stage('Deploy to EC2 using Ansible') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    dir('ansible') {
                        sh '''
                        ansible --version
                        ansible-playbook -i inventory playbook.yml
                        '''
                    }
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
