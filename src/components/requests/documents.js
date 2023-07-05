async function getHistogramData() {
    const token = localStorage.getItem('token');
    const url = 'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms';
    const data = {
        "ids": ["1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw="
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
    }; try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json.items;
    } catch (error) {
        console.error('Error:', error);
    }
}