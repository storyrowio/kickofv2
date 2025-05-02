import {Card, CardContent} from "@/components/ui/card.jsx";
import * as React from "react";
import WorkspaceForm from "@/components/pages/workspace/WorkspaceForm.jsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import MemberForm from "@/components/pages/member/MemberForm.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function CreateInitialWorkspace() {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState(0);

    return (
        <div className="h-screen p-6 flex justify-center items-center bg-muted">
            <Card className="min-w-full lg:min-w-3xl">
                <CardContent className="text-center">
                    <h1 className="text-2xl font-semibold">Create Your First Workspace</h1>
                    <p className="mb-10 text-sm">🚀 Let’s get started with your first workspace</p>
                    {activeSection === 0 && (
                        <WorkspaceForm onSubmit={() => {
                            setActiveSection(1)
                            // navigate('/app');
                        }}/>
                    )}
                    {activeSection === 1 && (
                        <div className="grid gap-4">
                            <MemberForm/>
                            <div className="flex justify-end gap-3">
                                <Button color="default" variant="ghost" onClick={() => navigate('/app')}>
                                    Skip
                                </Button>
                                <Button>
                                    Invite
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}