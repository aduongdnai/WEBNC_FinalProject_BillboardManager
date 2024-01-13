export default {
    adLocationSchema: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "https://example.com/object1705115713.json",
        "title": "Root",
        "type": "object",
        "required": [
            "address",
            "area",
            "locationType",
            "advertisingType",
            "image",
            "planned",
            "coordinates"
        ],
        "properties": {
            "address": {
                "$id": "#root/address",
                "title": "Address",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "area": {
                "$id": "#root/area",
                "title": "Area",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "locationType": {
                "$id": "#root/locationType",
                "title": "Locationtype",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "advertisingType": {
                "$id": "#root/advertisingType",
                "title": "Advertisingtype",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "image": {
                "$id": "#root/image",
                "title": "Image",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "planned": {
                "$id": "#root/planned",
                "title": "Planned",
                "type": "boolean",
                "default": true
            },
            "coordinates": {
                "$id": "#root/coordinates",
                "title": "Coordinates",
                "type": "object",
                "required": [
                    "type",
                    "coordinates"
                ],
                "properties": {
                    "type": {
                        "$id": "#root/coordinates/type",
                        "title": "Type",
                        "type": "string",
                        "default": "",
                        "pattern": "^.*$"
                    },
                    "coordinates": {
                        "$id": "#root/coordinates/coordinates",
                        "title": "Coordinates",
                        "type": "array",
                        "default": [],
                        "items": {
                            "$id": "#root/coordinates/coordinates/items",
                            "title": "Items",
                            "type": "number",
                            "default": 0.0
                        }
                    }
                }
            }

        }
    }

}