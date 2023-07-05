
async function searchObjects(searchParams) {
  const token = localStorage.getItem('token');
  const url = 'https://gateway.scan-interfax.ru/api/v1/objectsearch/';
  const data = {
    "issueDateInterval": {
      "startDate": searchParams.fromDate,
      "endDate": searchParams.toDate
    },
    "searchContext": {
      "targetSearchEntitiesContext": {
        "targetSearchEntities": [
          {
            "type": "company",
            "sparkId": null,
            "entityId": null,
            "inn": searchParams.inn,
            "maxFullness": searchParams.completeness,
            "inBusinessNews": searchParams.businessContext
          }
        ],
        "onlyMainRole": searchParams.mainRole,
        "tonality": searchParams.tonality,
        "onlyWithRiskFactors": searchParams.riskFactor,
        "riskFactors": {
          "and": [],
          "or": [],
          "not": []
        },
        "themes": {
          "and": [],
          "or": [],
          "not": []
        }
      },
      "themesFilter": {
        "and": [],
        "or": [],
        "not": []
      }
    },
    "searchArea": {
      "includedSources": [],
      "excludedSources": [],
      "includedSourceGroups": [],
      "excludedSourceGroups": []
    },
    "attributeFilters": {
      "excludeTechNews": searchParams.technicalNews,
      "excludeAnnouncements": searchParams.announcements,
      "excludeDigests": searchParams.newsDigest
    },
    "similarMode": "duplicates",
    "limit": searchParams.value,
    "sortType": "sourceInfluence",
    "sortDirectionType": "desc",
    "intervalType": "month",
    "histogramTypes": [
      "totalDocuments",
      "riskFactors"
    ]
  }
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.status !== 200 || !response.ok) { // проверяем статус ответа
      let errorMessage = 'error';
      return errorMessage
    } else { return json.items; }
  } catch (error) {
    console.error('Error:', error);

  }
}

export default searchObjects;