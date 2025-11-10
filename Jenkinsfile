pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        FRONTEND_IMAGE = "nirobnk/devops-frontend"
        BACKEND_IMAGE = "nirobnk/devops-backend"
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
                script {
                    sh 'docker build -t $FRONTEND_IMAGE:latest ./frontend'
                    sh 'docker build -t $BACKEND_IMAGE:latest ./backend'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh 'docker push $FRONTEND_IMAGE:latest'
                    sh 'docker push $BACKEND_IMAGE:latest'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker logout || true'
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}