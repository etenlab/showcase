import { useQuery } from "@apollo/client";
import {
    IonContent,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
} from "@ionic/react";
import { useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { languageProficienciesQuery } from "../common/query";
import { StyledWrap } from "../common/styles";

const LanguageProficiency = () => {
    const { data } = useQuery(languageProficienciesQuery);
    const skillLevelOptions = useMemo(() => {
        return {
            "Started Learning": 1,
            "Recognize Words": 2,
            Proficient: 3,
            Conversational: 4,
            Fluent: 5,
        };
    }, []);

    console.log(data);

    const [skillLevel, setSkillLevel] = useState("");

    const { control, handleSubmit } = useForm();
    return (
        <IonContent>
            <StyledWrap>
                <Controller
                    control={control}
                    name="Proficiency Level"
                    render={() => (
                        <IonSelect
                            placeholder="Proficiency Level"
                            style={{ border: "1px solid gray" }}
                            onIonChange={(e) => {
                                setSkillLevel(e.detail.value);
                            }}
                            value={skillLevel}
                        >
                            {Object.entries(skillLevelOptions).map(
                                ([skill, value]) => (
                                    <IonSelectOption value={skill} key={value}>
                                        {skill}
                                    </IonSelectOption>
                                )
                            )}
                        </IonSelect>
                    )}
                />

                {/* {skillLevel &&
                    skillLevelOptions[
                        skillLevel as keyof typeof skillLevelOptions
                    ]} */}

                <IonList>
                    {data &&
                        data.languageProficiencies.map((item: any) => (
                            <IonItem>
                                {
                                    skillLevelOptions[
                                        item.skill_level as keyof typeof skillLevelOptions
                                    ]
                                }{" "}
                                - {item.skill_level}
                            </IonItem>
                        ))}
                </IonList>
            </StyledWrap>
        </IonContent>
    );
};

export default LanguageProficiency;
