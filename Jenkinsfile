pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        IMAGE_NAME_FRONTEND = 'amal761/frontend'
        IMAGE_NAME_BACKEND = 'amal761/backend'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'git@your-repo-url.git', 
                    credentialsId: 'Gitlab_ssh'
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    script {
                        dockerImageFrontend = docker.build("${IMAGE_NAME_FRONTEND}")
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    script {
                        dockerImageBackend = docker.build("${IMAGE_NAME_BACKEND}")
                    }
                }
            }
        }

        stage('Scan Frontend Image') {
            steps {
                script {
                    sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                        aquasec/trivy:latest image --exit-code 0 \
                        --severity LOW,MEDIUM,HIGH,CRITICAL \
                        ${IMAGE_NAME_FRONTEND}
                    """
                }
            }
        }

        stage('Scan Backend Image') {
            steps {
                script {
                    sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                        aquasec/trivy:latest image --exit-code 0 \
                        --severity LOW,MEDIUM,HIGH,CRITICAL \
                        ${IMAGE_NAME_BACKEND}
                    """
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKERHUB_CREDENTIALS}") {
                        dockerImageFrontend.push()
                        dockerImageBackend.push()
                    }
                }
            }
        }
    }
}
