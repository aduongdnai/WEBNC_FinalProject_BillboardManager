export const reportclusterLayer = {
    id: 'report-clusters',
    type: 'circle',
    source: 'reportLocations',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 20, '#f1f075', 50, '#f28cb1'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 20, 30, 50, 40]
    }
};

export const reportclusterCountLayer = {
    id: 'report-cluster-count',
    type: 'symbol',
    source: 'reportLocations',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Roboto Regular'],
        'text-size': 12
    }
};

export const reportunclusteredPointLayer = {
    id: 'report-unclustered-point',
    type: 'circle',
    source: 'reportLocations',
    filter: ['!', ['has', 'point_count']],
    interactive: true,
    paint: {
        'circle-color': [
            'match',
            ['to-string', ['get', 'status']],
            'Pending', '#fffc3c',
            'Processed', '#45ff3c',
            '#fff'
        ],
        // 'circle-color': '#1a3fb0',
        'circle-radius': 10,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
    }
};
export const reportunclusteredPointTextLayer = {
    id: 'report-unclustered-point-text',
    type: 'symbol',
    source: 'reportLocations',
    filter: ['!', ['has', 'point_count']],
    layout: {
        'text-field': 'BC',
        'text-font': ['Roboto Regular'],
        'text-size': 12,
    },
    paint: {
        'text-color': [
            'match',
            ['to-string', ['get', 'status']],
            'Pending', '#000000',
            // color for planned
            'Processed', '#ffffff', // color for not planned
            '#000000' // default color
        ]
    }
};