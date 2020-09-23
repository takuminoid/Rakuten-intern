import { useEffect, useState } from 'react'
import toJson from '../toJson/toJson'

var token = localStorage.getItem("token");

const GetPosts = async ({page}) => {
    const params  = {
      searchText: '',
      per_page: 15,
      page:page,
      key: '6657453-1ec2ff079372fc50cbf7f4d3b',
      };
    const qs = new URLSearchParams(params);
    const resp = await fetch(
      `https://pixabay.com/api?${qs}`
    )
    const data = await resp.json()
    return await data
  }

const AllPost = async () => {
  const resp = await fetch(`http://localhost:8000/api/getpost/`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          'Authorization': `JWT ${token}`
        }
    })
    return await toJson(resp)
}
// export default GetPosts
export default AllPost

