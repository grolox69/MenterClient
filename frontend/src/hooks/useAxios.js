import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'config/firebase';
import { getAuth } from 'firebase/auth';
import { baseUrl } from 'shared/baseUrl';
import axios from 'axios';

export const createToken = async () => {
  const auth = getAuth(firebase);
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());

  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}

export const useAxiosFetch = (path) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    const header = await createToken();
    try {
      const res = await axios.get(baseUrl+path, header);
      setResponse(res.data);
    } catch (err) {
      setError(err);
      navigate('/404');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, loading, error, setResponse };
}
 
export const axiosPost = async (path, data) => {
  const header = await createToken();
  const res = axios.post(baseUrl+path, data, header).then((response) => {
    return response.data
  });
  return res;
}

export const axiosDelete = async (path) => {
  const header = await createToken();
  const res = axios.delete(baseUrl+path, header).then((response) => {
    return response.data
  });
  return res;
}
