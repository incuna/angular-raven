(function (angular) {
    'use strict';

    var module = angular.module('angular-raven', [
        'project_settings',
    ]);

    // Use sentry to capture AngularJS exceptions
    module.factory('$exceptionHandler', ['$window', '$log', 'PROJECT_SETTINGS', function ($window, $log, PROJECT_SETTINGS) {
        if ($window.Raven && angular.isDefined(PROJECT_SETTINGS.SENTRY_DSN)) {
            $window.Raven.config(PROJECT_SETTINGS.SENTRY_DSN).install();
            return function (exception, cause) {
                $log.error.apply($log, arguments);
                $window.Raven.captureException(exception);
            };
        } else {
            return function (exception, cause) {
                $log.error.apply($log, arguments);
            };
        }
    }]);
}(window.angular));

