export default {
    adBoardSchema: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "https://example.com/object1705112816.json",
        "title": "Root",
        "type": "object",
        "required": [
            "location_id",
            "boardType",
            "width",
            "height"
        ],
        "properties": {
            "location_id": {
                "$id": "#root/location_id",
                "title": "Location_id",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "boardType": {
                "$id": "#root/boardType",
                "title": "Boardtype",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "width": {
                "$id": "#root/width",
                "title": "Width",
                "type": "integer",
                "default": 0
            },
            "height": {
                "$id": "#root/height",
                "title": "Height",
                "type": "integer",
                "default": 0
            }
        }
    }

}