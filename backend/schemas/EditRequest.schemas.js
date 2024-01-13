export default{
    req_schema:{
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1705047088.json", 
        "title": "Root", 
        "type": "object",
        "required": [
            "userRequest",
            "reason"
        ],
        "properties": {
            "userRequest": {
                "$id": "#root/district", 
                "title": "District", 
                "type": "string",
                "default": "",
               
                "pattern": "^.*$"
            },
            "reason": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
               
                "pattern": "^.*$"
            },
            
        },
    },
    req_update_schema:{
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1705047088.json", 
        "title": "Root", 
        "type": "object",
        "required": [
            "status"
        ],
        "properties": {         
            "status": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",              
                "pattern": "^.*$"
            }
        },
    },
}