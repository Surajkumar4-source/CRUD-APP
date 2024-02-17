import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Update = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem("id"));
        setName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Id...", id);
        axios
            .put(`https://65d0ad98ab7beba3d5e384ba.mockapi.io/cloud/${id}`, {
                name: name,
                email: email,
            })
            .then(() => {
                navigate("/read");
            });
    };

    return (
        <>
            <h2>Update</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-warning mx-2"
                    onClick={handleUpdate}
                >
                    Update
                </button>
               
            </form>
        </>
    );
};

export default Update;