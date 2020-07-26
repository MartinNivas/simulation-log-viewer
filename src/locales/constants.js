module.exports = Object.freeze({
    HEADER : {
        TITLE: 'Simulation Log Viewer'
    },
    SEARCH : {
        NOT_APPLICABLE: 'NA',
        MAX_PERCENTAGE: 100,
        MIN_PERCENTAGE: 0,
        TABLE: {
            HEADER: {
                ONE: 'Percentage of runs that exceed the maximum number of stops',
                TWO: 'Percentage of runs that exceed the maximum running time',
                THREE: 'Percentage of runs that have a collision',
                FOUR: 'Percentage of runs that do not pass'
            }
            
        },
        SCENARIOID_PLACEHOLDER: "Enter Scenarioid ... Hint: type 's'",
        CARBUILD_PLACEHOLDER: "Enter Car build ... Hint: type 'c'"
    },
    TABLE_VIEW: {
        TABLE: {
            EMPTY_MSG: 'No records found',
            PAGE_REPORT: 'Showing {first} to {last} of {totalRecords} entries',
            HEADER: {
                ONE: 'scenarioid',
                TWO: 'carBuild',
                THREE: 'startTime',
                FOUR: 'runningTime / maxRunningTime',
                FIVE: 'numberOfStops / maxNumberOfStops',
                SIX: 'hasCollision',
                SEVEN: 'doesScenarioPass'
            },
            FILTER_PLACEHOLDER: {
                SCENARIO: 'Search by scenario id',
                CARBUILD: 'Search by car build'
            }
        },
        BOOLEAN_VALUE: {
            YES: 'Yes',
            NO: 'No'
        }
    }
  });