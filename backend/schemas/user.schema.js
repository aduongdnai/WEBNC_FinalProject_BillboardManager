export default {
  user_schema: {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#", 
    "$id": "https://example.com/object1705059387.json", 
    "title": "Root", 
    "type": "object",
    "required": [
      "username",
      "email",
      "password",
      "role",
      "district",
      "ward",
      "createdAt",
      "updatedAt"
    ],
    "properties": {
      "username": {
        "$id": "#root/username", 
        "title": "Username", 
        "type": "string",
        "default": "",
        "examples": [
          "sampleUsername"
        ],
        "pattern": "^.*$"
      },
      "email": {
        "$id": "#root/email", 
        "title": "Email", 
        "type": "string",
        "default": "",
        "examples": [
          "sample@email.com"
        ],
        "pattern": "^.*$"
      },
      "password": {
        "$id": "#root/password", 
        "title": "Password", 
        "type": "string",
        "default": "",
        "examples": [
          "samplePassword"
        ],
        "pattern": "^.*$"
      },
      "newPassword": {
        "$id": "#root/newPassword", 
        "title": "Newpassword", 
        "type": "string",
        "default": "",
        "examples": [
          "sampleNewPassword"
        ],
        "pattern": "^.*$"
      },
      "role": {
        "$id": "#root/role", 
        "title": "Role", 
        "type": "string",
        "default": "",
        "examples": [
          "sampleRole"
        ],
        "pattern": "^.*$"
      },
      "district": {
        "$id": "#root/district", 
        "title": "District", 
        "type": "string",
        "default": "",
        "examples": [
          "1"
        ],
        "pattern": "^.*$"
      },
      "ward": {
        "$id": "#root/ward", 
        "title": "Ward", 
        "type": "string",
        "default": "",
        "examples": [
          "2"
        ],
        "pattern": "^.*$"
      },
      "rfToken": {
        "$id": "#root/rfToken", 
        "title": "Rftoken", 
        "type": "string",
        "default": "",
        "examples": [
          "sampleRefreshToken"
        ],
        "pattern": "^.*$"
      },
      "createdAt": {
        "$id": "#root/createdAt", 
        "title": "Createdat", 
        "type": "string",
        "default": "",
        "examples": [
          "2024-01-12T00:00:00.000Z"
        ],
        "pattern": "^.*$"
      },
      "updatedAt": {
        "$id": "#root/updatedAt", 
        "title": "Updatedat", 
        "type": "string",
        "default": "",
        "examples": [
          "2024-01-12T00:00:00.000Z"
        ],
        "pattern": "^.*$"
      }
    }
  },
  user_update_schema: {
    definitions: {},
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://example.com/object1705050670.json",
    title: "Root",
    type: "object",
    anyOf: [
      {
         required: ["username", "email", "password"],
         required: ["role"],
         required: ["district"],
         required: ["ward"],
         required: ["rfToken"],
         required: ["ward"],
      },
    ],
    required: [
      "username",
      "email",
      "password",
    ],
    properties: {
      username: {
        $id: "#root/username",
        title: "Username",
        type: "string",
        default: "",
        examples: ["khoa"],
        pattern: "^.*$",
      },
      email: {
        $id: "#root/email",
        title: "Email",
        type: "string",
        default: "",
        examples: ["admin1@email.com"],
        pattern: "^.*$",
      },
      password: {
        $id: "#root/password",
        title: "Password",
        type: "string",
        default: "",
        examples: ["123123123"],
        pattern: "^.*$",
      },
      newPassword: {
        $id: "#root/newPassword",
        title: "Newpassword",
        type: "string",
        default: "",
        examples: ["112233"],
        pattern: "^.*$",
      },
      role: {
        $id: "#root/role",
        title: "Role",
        type: "string",
        default: "",
        examples: ["CB_Phuong"],
        pattern: "^.*$",
      },
      district: {
        $id: "#root/district",
        title: "District",
        type: "string",
        default: "",
        examples: ["1"],
        pattern: "^.*$",
      },
      ward: {
        $id: "#root/ward",
        title: "Ward",
        type: "string",
        default: "",
        examples: ["2"],
        pattern: "^.*$",
      },
      rfToken: {
        $id: "#root/rfToken",
        title: "Rftoken",
        type: "string",
        default: "",
        examples: ["sampleRefreshToken"],
        pattern: "^.*$",
      },
    },
  },
};
