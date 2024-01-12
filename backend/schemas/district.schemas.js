export default{
    district_schema:{
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1705046791.json", 
        "title": "Root", 
        "type": "object",
        "required": [
            "name"
        ],
        "properties": {
            "name": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
                "examples": [
                    "Quận 10, Hồ Chí Minh"
                ],
                "pattern": "^.*$"
            }
        },
        "additionalProperties": false
    }
}