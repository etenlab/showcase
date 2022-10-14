import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonList,
} from "@ionic/react";
import { StyledWrap, StyledH3 } from "../common/styles";
import { Controller, useForm } from "react-hook-form";
import { appItemsQuery, createAppItemMutation } from "../common/query";
import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";

export interface IAppItem {
    id: number;
    app_name: string;
}

const AppList: React.FC = () => {
    const { control, handleSubmit } = useForm();
    const [appName, setAppName] = useState<string>("");
    const { data } = useQuery(appItemsQuery);
    const appData = useMemo(() => data, [data]);
    const [createAppItem] = useMutation(createAppItemMutation);

    const handleSubmitForm = () => {
        createAppItem({
            variables: { input: { app_name: appName } },
            update: (cache, result) => {
                const cached = cache.readQuery({
                    query: appItemsQuery,
                    returnPartialData: true,
                });
                cache.writeQuery({
                    query: appItemsQuery,
                    data: {
                        //@ts-expect-error
                        ...cached,
                        appItems: [
                            //@ts-expect-error
                            ...cached.appItems,
                            result.data.createAppItem,
                        ],
                    },
                });
            },
        });
        setAppName("");
    };

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>App List</StyledH3>
                <div>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <div style={{ display: "flex" }}>
                            <Controller
                                control={control}
                                name="appName"
                                render={() => (
                                    <IonInput
                                        placeholder="New App Name"
                                        style={{ border: "1px solid gray" }}
                                        onIonChange={(e) => {
                                            //@ts-expect-error
                                            setAppName(e.target.value);
                                        }}
                                        value={appName}
                                    />
                                )}
                            />

                            <IonButton fill="outline" type="submit" disabled={!appName}>
                                Submit
                            </IonButton>
                        </div>
                    </form>
                    <IonList lines="none">
                        {appData &&
                            appData.appItems.map((item: IAppItem) => (
                                <IonItem>{item.app_name}</IonItem>
                            ))}
                    </IonList>
                </div>
            </StyledWrap>
        </IonContent>
    );
};

export default AppList;
