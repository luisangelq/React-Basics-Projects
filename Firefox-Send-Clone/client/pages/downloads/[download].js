import styled from "styled-components";
import MainPanel from "../../components/MainPanel";
import axiosClient from "../../config/axios";

export async function getServerSideProps({ params }) {
  console.log(params);
  const res = await axiosClient.get(`/api/links/${params.download}`);
  console.log(res);
  return {
    props: {
      download: res.data.linkObj,
    },
  };
}

export async function getServerSidePaths() {
  const links = await axiosClient.get("/api/links");

  console.log(links.data);

  return {
    paths: links.data.links.map((link) => ({ params: { download: link.url } })),
    fallback: false,
  };
}

const Download = ({ download }) => {
  console.log(download);
  return (
    <MainPanel>
      <DownloadPanel>
        <h2>Download Files</h2>
        <p>
          This file was shared via Firefox Send with end-to-end encryption and a
          link that automatically expires.
        </p>

        <div className="fileCard">
            <img src="/assets/documentIcon.svg" />

            <div>
                <h3></h3>
                <p></p>
            </div>
        </div>
      </DownloadPanel>
      <PasswordLock></PasswordLock>
    </MainPanel>
  );
};

const DownloadPanel = styled.div``;

const PasswordLock = styled.div``;

export default Download;
