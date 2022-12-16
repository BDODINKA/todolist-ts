import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {LoginTC} from "./auth-reducer";
import {Navigate} from 'react-router-dom';
import {selectorIsLogin} from "../../common/selectors/selectorsAll";
import {useAppDispatch} from "../../utils/hooks/useAppDispatch";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Auth = () => {

    const isLogin = useSelector(selectorIsLogin)

    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3 || values.password.length > 16) {
                errors.password = "Password should be more 3 but not more 16 symbols"
            }
            return errors
        },
        onSubmit: values => {
            // alert(JSON.stringify(values))
            dispatch(LoginTC(values))
            formik.resetForm()
        },
    })


    if (isLogin) {
        return <Navigate to={'/'}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox/>}
                                name="rememberMe"
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}