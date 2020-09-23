import { useEffect, useState } from 'react'


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
export default GetPosts

