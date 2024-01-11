export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'adlocations',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 20, '#f1f075', 50, '#f28cb1'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 20, 30, 50, 40]
    }
};

export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'adlocations',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Roboto Regular'],
        'text-size': 12
    }
};

export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'adlocations',
    filter: ['!', ['has', 'point_count']],
    interactive: true,
    paint: {
        'circle-color': [
            'match',
            ['to-string', ['get', 'planned']],
            'true', [
                'match',
                ['to-string', ['get', 'hasAdBoard']],
                'true', '#45ff3c',
                'false', '#0022FF',
                '#0022FF'
            ],
            'false', '#5b5b5b',
            '#fff'
        ],
        // 'circle-color': '#1a3fb0',
        'circle-radius': 10,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
    }
};
export const unclusteredPointTextLayer = {
    id: 'unclustered-point-text',
    type: 'symbol',
    source: 'adlocations',
    filter: ['!', ['has', 'point_count']],
    layout: {
        'text-field': 'QC',
        'text-font': ['Roboto Regular'],
        'text-size': 12,
    },
    paint: {
        'text-color': [
            'match',
            ['to-string', ['get', 'planned']],
            'true', [
                'match',
                ['to-string', ['get', 'status']],
                'Pending', '#000000',
                'Handled', '#000000',
                '#000000'
            ],
            // color for planned
            'false', '#ffffff', // color for not planned
            '#000000' // default color
        ]
    }
};