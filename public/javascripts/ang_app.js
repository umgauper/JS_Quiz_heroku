var app = angular.module('ang_app', [])
    .controller('quizController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {
        var url = 'https://api.mongolab.com/api/1/databases/quiz_question_sets/collections/questionSets?apiKey=iMg3sLxSc8OjLTCX7C3f_bEQse5TL74o';

        $http.get(url).success(function(data) { //TODO: Add error handling for  when database connection doesn't work!
            $scope.questionSets = data
        });


        var answers = {};

        function updateAnswers() {
            answers[$scope.i] = $('input:checked').val();
        }

        function loadStoredAnswer() {
            $('input:checked').prop('checked', false);
            if(answers[$scope.i]) { // If there is a value for the current answer,
                var ans = answers[$scope.i];
                var radio = "input[value='" + ans + "']";
                $(radio).prop('checked', true); //check the corresponding radio button.
            }
        }

        $scope.i = 0;   //TODO: maybe? on score page show chosen answer and correct answers?

        $scope.calculateScore = function() {

            if ($('input:checked').val()) {
                updateAnswers();
                $scope.score = 0; // reset the score each time Calculate button is clicked
                var userAnswers = [];
                for(var answer in answers) {
                    userAnswers.push(answers[answer]);
                    }

                for(var j=0; j<$scope.questionSets.length; j++) {
                    if( userAnswers[j] == $scope.questionSets[j].correctAnswer) { // check if user answer matches the correct answer
                        $scope.score++;
                        }
                    }
                $scope.i++;
                var host = $location.host();
                var port = $location.port();

                $http.post('/updateScore', {"score": $scope.score}); //save user's score to database

                $window.location.href = host + ':' + port + '/rankings';

            } else {
                $('#error').show();
            }
       };

        $scope.next = function() {

            if ( $('input:checked').val() ) { // validates that the user has chosen an answer
                $('#error').hide();
                updateAnswers();
                if($scope.i < $scope.questionSets.length) {
                    $scope.i++;
                    loadStoredAnswer();
                }

            } else {
                $('#error').show(); // if no answer is chosen, show error message
            }
        };

        $scope.prev = function() {
            $('#error').hide();
            updateAnswers();
            if($scope.i > 0) {
                $scope.i--;
                loadStoredAnswer();
            }
        };

        $('input[type=radio]').on('click', function() {
            $('#error').hide();
        });
    }]);
