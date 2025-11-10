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
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh 'docker push $FRONTEND_IMAGE:latest'
                        sh 'docker push $BACKEND_IMAGE:latest'
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}