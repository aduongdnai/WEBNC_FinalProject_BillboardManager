export default{
    ward_schema:{
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1705047088.json", 
        "title": "Root", 
        "type": "object",
        "required": [
            "district",
            "name"
        ],
        "properties": {
            "district": {
                "$id": "#root/district", 
                "title": "District", 
                "type": "string",
                "default": "",
                "examples": [
                    "Quận 10, Hồ Chí Minh"
                ],
                "pattern": "^.*$"
            },
            "name": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
                "examples": [
                    "Phường 1"
                ],
                "pattern": "^.*$"
            }
        },
        "additionalProperties": false
    },
    ward_update_schema:{
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1705047088.json", 
        "title": "Root", 
        "type": "object",
        "anyOf": [
            {
                "required": [
                    "district",
                    "name"
                ]
            },
            {
                "required": [
                    "district"
                ]
            },
            {
                "required": [
                    "name"
                ]
            },
        ],
        "properties": {
            "district": {
                "$id": "#root/district", 
                "title": "District", 
                "type": "string",
                "default": "",
                "examples": [
                    "Quận 10, Hồ Chí Minh"
                ],
                "pattern": "^.*$"
            },
            "name": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
                "examples": [
                    "Phường 1"
                ],
                "pattern": "^.*$"
            }
        },
        "additionalProperties": false
    },
}