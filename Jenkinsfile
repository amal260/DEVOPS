pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'amal761/backend:latest'
        FRONTEND_IMAGE = 'amal761/frontend:latest'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository'
                git branch: 'main', url: 'https://github.com/amal260/DEVOPS.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images for backend and frontend'
                sh """
                    docker build -t $BACKEND_IMAGE -f ./product-management-main/backend/Dockerfile ./product-management-main/backend
                    docker build -t $FRONTEND_IMAGE -f ./product-management-main/frontend/Dockerfile ./product-management-main/frontend
                """
            }
        }

        stage('Push Docker Images') {
            steps {
                echo 'Pushing Docker images to Docker Hub'
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                            docker push $BACKEND_IMAGE
                            docker push $FRONTEND_IMAGE
                        """
                    }
                }
            }
        }
    }
}
