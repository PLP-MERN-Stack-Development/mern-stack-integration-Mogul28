import { useState, useEffect } from 'react';
import api from '../api/api';


export default function useApi(endpoint, deps = []){
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
let cancelled = false;
setLoading(true);
api.get(endpoint).then(res => {
if(!cancelled) setData(res.data);
}).catch(err => { if(!cancelled) setError(err); })
.finally(() => { if(!cancelled) setLoading(false); });
return () => { cancelled = true; };
}, deps);


return { data, loading, error };
}