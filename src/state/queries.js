exports.GET_DATA = `
  query GetData {
    allPrograms {
      id
      name
      link
      image {
        filename
        publicUrlTransformed(transformation: { width: "400", crop: "limit" })
      }
      price
      priceType
      currency

      trainingDaysPerWeek
      actRecDaysPerWeek
      hoursPerDay

      payment { name }
      trainingTypes { name }
      goal { name }
      level { name }
      languages { name }
      extras { name }
      ages { name }
    }

    allPaymentTypes {
      name
    }

    allTrainingTypes {
      name
    }

    allGoals {
      name
    }

    allLevels {
      name
    }

    allLanguages {
      name
    }

    allAges {
      name
    }

    allExtras {
      name
    }
  }
`;

exports.graphql = function(query, variables = {}) {
    return fetch(process.env.baseUrl + '/admin/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            variables,
            query,
        }),
    }).then(function(result) {
        return result.json();
    });
};