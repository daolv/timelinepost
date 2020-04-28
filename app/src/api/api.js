import axios from 'axios';

const API_BASE = "http://localhost:8000";
const callAPI = (url, method, data, contentType) => {
    return axios({
        url: url,
        method: method,
        data: data,
        headers: {
            "Content-Type": contentType
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    })
}

export default {

    uploadFiles: function (files) {
        let formData = new FormData();
        files.map(file => formData.append("files", file));
        return callAPI(`${API_BASE}/upload`, "POST", formData, "multipart/form-data");
    },

    removeImage: function (image) {
     
        return callAPI(`${API_BASE}/files`, "DELETE", image, "application/json");
    },

    getPosts: function () {
        return callAPI(`${API_BASE}/posts`, "GET", null, "application/json");
    },

    addPost(post) {
        return callAPI(`${API_BASE}/posts`, "POST", post, "application/json");
    },

    updatePost(post) {
        return callAPI(`${API_BASE}/posts`, "PUT", post, "application/json");
    },
}