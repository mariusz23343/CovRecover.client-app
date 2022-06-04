import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../Errors/ValidationErrors";

export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{displayname:'', username:'', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values)
            .catch(error => setErrors({error}))}
            validationSchema={Yup.object({
                displayname: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                    <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                        <Header as='h2' content='Zarejestruj się w CovRecover' color='teal' textAlign='center' />
                        <CustomTextInput name='displayname' placeholder='Nick' />
                        <CustomTextInput name='username' placeholder='Nazwa Użytkownika' /> 
                        <CustomTextInput name='email' placeholder='Email' /> 
                        <CustomTextInput name='password' placeholder='Hasło' type='password' /> 
                        <ErrorMessage
                            name='error' render={() => <ValidationErrors errors={errors.error} />}
                         />
                        <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid /> 
                    </Form>
                )}
        </Formik>
)
})