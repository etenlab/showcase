import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
} from "@ionic/react";
import { StyledWrap, StyledH3 } from "../common/styles";
import { Controller, useForm } from "react-hook-form";
import {
    appItemsQuery,
    createSiteTextTranslationMutation,
    siteTextsByAppIdQuery,
    siteTextTranslationsQuery,
} from "../common/query";
import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { IAppItem } from "./AppList";
import { ISiteText } from "./SiteText";

export interface ISiteTextTranslation {
    id: number;
    site_text: number;
    site_text_translation: number;
    user_id: string;
    language_id: number;
    language_table: string;
}

const SiteTextTranslation: React.FC = () => {
    const { control, handleSubmit } = useForm();
    const [app, setApp] = useState<IAppItem | undefined>(undefined);
    const [siteText, setSiteText] = useState<ISiteText | undefined>(undefined);
    const [siteTextTranslation, setSiteTextTranslation] = useState<string>("");

    const appItemsRequest = useQuery(appItemsQuery);

    const appData: { appItems: IAppItem[] } = useMemo(
        () => appItemsRequest.data,
        [appItemsRequest.data]
    );
    const siteTextRequest = useQuery(siteTextsByAppIdQuery, {
        skip: app?.id === undefined,
        variables: { siteTextsByAppIdId: app?.id },
    });

    const siteTextData: { siteTextsByAppId: ISiteText[] } = useMemo(
        () => siteTextRequest.data,
        [siteTextRequest.data]
    );

    const { data } = useQuery(siteTextTranslationsQuery);

    const siteTextTranslationData: {
        siteTextTranslations: ISiteTextTranslation[];
    } = useMemo(() => data, [data]);

    const [createSiteTextTranslation] = useMutation(
        createSiteTextTranslationMutation
    );

    const handleSubmitForm = () => {
        createSiteTextTranslation({
            variables: {
                input: {
                    site_text: siteText?.id,
                    site_text_translation: siteTextTranslation,
                    language_id: 2,
                    language_table: "language_table",
                    user_id: "user_id",
                },
            },
            update: (cache, result) => {
                const cached = cache.readQuery({
                    query: siteTextTranslationsQuery,
                    returnPartialData: true,
                });
                cache.writeQuery({
                    query: siteTextTranslationsQuery,
                    data: {
                        //@ts-expect-error
                        ...cached,
                        siteTextTranslations: [
                            //@ts-expect-error
                            ...cached.siteTextTranslations,
                            result.data.createSiteTextTranslation,
                        ],
                    },
                });
            },
        });

        setApp(undefined);
        setSiteText(undefined);
        setSiteTextTranslation("");
    };

    const isDisabled =
        !siteTextData ||
        (siteTextData && siteTextData.siteTextsByAppId.length < 1);

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Site Text Translation</StyledH3>
                <div>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <Controller
                            control={control}
                            name="appName"
                            render={() => (
                                <IonSelect
                                    placeholder="Choose App"
                                    style={{ border: "1px solid gray" }}
                                    onIonChange={(e) => {
                                        setApp(e.detail.value);
                                        setSiteText(undefined);
                                    }}
                                    value={app}
                                >
                                    {appData &&
                                        appData.appItems.map(
                                            (item: IAppItem) => (
                                                <IonSelectOption
                                                    id={item.app_name}
                                                    value={item}
                                                >
                                                    {item.app_name}
                                                </IonSelectOption>
                                            )
                                        )}
                                </IonSelect>
                            )}
                        />

                        <div
                            className="ion-center"
                            style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                            <Controller
                                control={control}
                                name="siteText"
                                render={() => (
                                    <IonSelect
                                        placeholder={
                                            isDisabled
                                                ? "No site texts available"
                                                : "Choose Site Text"
                                        }
                                        style={{ border: "1px solid gray" }}
                                        onIonChange={(e) => {
                                            setSiteText(e.detail.value);
                                        }}
                                        disabled={isDisabled}
                                        value={siteText}
                                    >
                                        {siteTextData &&
                                            siteTextData.siteTextsByAppId.map(
                                                (item: ISiteText) => (
                                                    <IonSelectOption
                                                        key={item.id}
                                                        value={item}
                                                    >
                                                        {item.site_text_key}
                                                    </IonSelectOption>
                                                )
                                            )}
                                        {!siteTextData && (
                                            <IonItem>
                                                'No items to select'
                                            </IonItem>
                                        )}
                                    </IonSelect>
                                )}
                            />
                        </div>
                        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <p>{siteText?.description}</p>
                        </div>

                        <Controller
                            control={control}
                            name="siteTextTranslation"
                            render={() => (
                                <IonInput
                                    disabled={!siteText}
                                    placeholder="New Translation"
                                    style={{ border: "1px solid gray" }}
                                    onIonChange={(e) => {
                                        setSiteTextTranslation(
                                            //@ts-expect-error
                                            e.target.value
                                        );
                                    }}
                                    value={siteTextTranslation}
                                />
                            )}
                        />

                        <IonButton
                            fill="outline"
                            type="submit"
                            disabled={!app || !siteText || !siteTextTranslation}
                        >
                            Submit
                        </IonButton>
                    </form>
                    <IonList lines="none">
                        {siteTextTranslationData &&
                            siteTextTranslationData.siteTextTranslations.map(
                                (item: ISiteTextTranslation) => (
                                    <IonItem key={item.id}>
                                        {item.site_text_translation}
                                    </IonItem>
                                )
                            )}
                    </IonList>
                </div>
            </StyledWrap>
        </IonContent>
    );
};

export default SiteTextTranslation;
