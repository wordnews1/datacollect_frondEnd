
pipeline {
  environment {
    imagename = "mtc_front"
    
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git([url: 'git@github.com:CATIS-DEVELOPER/mtcFrontEnd.git', branch: 'main', credentialsId: 'Mtc_Git'])

      }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build imagename
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry('https://51.210.48.154:5000') {
            dockerImage.push("$BUILD_NUMBER")
             

          }
        }
      }
    }
    
  }
}
