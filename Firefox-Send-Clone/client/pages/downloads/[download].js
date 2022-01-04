import MainPanel from "../../components/MainPanel";
import axiosClient from "../../config/axios";

export async function getServerSideProps({ params }) {
    console.log(params);
    const res = await axiosClient.get(`/api/links/${params.download}`);
    console.log(res);
    return {
        props: {
            download: res.data.linkObj.fileName
        }
    }
}

export async function getServerSidePaths() {
    const links = await axiosClient.get("/api/links");

    console.log(links.data);
    
    return {
        paths: links.data.links.map((link) => ({ params: { download: link.url } })),
        fallback: false
    }
}

const Download = ({download}) => {
 console.log(download);
    return(
          <MainPanel>
              <h1>Download</h1>
          </MainPanel>
    )
}

export default Download;