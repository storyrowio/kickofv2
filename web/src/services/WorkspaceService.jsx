import Api from "@/lib/api.jsx";

const workspaceEndpoint = "/workspace"
const GetWorkspaces = (query) => {
    return Api.Instance.get(workspaceEndpoint, {params: query})
        .then(res => res.data?.data);
};

const CreateWorkspaces = (params) => {
    return Api.Instance.post(workspaceEndpoint, params)
        .then(res => res?.data);
};

const GetWorkspace = (id) => {
    return Api.Instance.get(`${workspaceEndpoint}/${id}`)
        .then(res => res.data?.data);
};

const UpdateWorkspace = (id, params) => {
    return Api.Instance.patch(`${workspaceEndpoint}/${id}`, params)
        .then(res => res?.data);
};

const DeleteWorkspace = (id) => {
    return Api.Instance.delete(`${workspaceEndpoint}/${id}`)
        .then(res => res?.data);
};

const WorkspaceService = {
    GetWorkspaces,
    CreateWorkspaces,
    GetWorkspace,
    UpdateWorkspace,
    DeleteWorkspace
};

export default WorkspaceService;
