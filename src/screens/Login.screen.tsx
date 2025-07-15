import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Row } from "antd";
import { CustomForm, FlexBox, FormInput, Paragraph, Icon } from "../components";
import { AuthService, UserService } from "../services";
import type { Auth } from "../models";
import { useToast, useAuth } from "../hooks";
import { colors } from "../config";

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setLogged, setUserName } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (values: Auth) => {
    try {
      setIsLoading(true);
      await AuthService.login(values);
      const userName = await UserService.getUserName();
      setLogged(true);
      setUserName(userName);
      navigate("/dashboard");
    } catch (error: any) {
      showToast({ message: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url(/login_background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <FlexBox
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{
          maxWidth: 400,
          width: "100%",
          padding: "20px",
        }}
      >
        <img src="/vallena_logo_3d.png" style={{ width: "150px", height: "150px" }} />
        <Paragraph
          text="VALLENA"
          variant="h1"
          style={{
            textAlign: "center",
            marginBottom: "20%",
            fontFamily: "Righteous, cursive",
          }}
        />
        <FlexBox direction="column" justifyContent="center">
          <CustomForm
            defaultValues={{ usernameOrEmail: "", password: "" }}
            onSubmitForm={async (data) => {
              handleSubmit(data);
            }}
            showSubmitButton={true}
            buttonStyles={{
              marginTop: 10,
              backgroundColor: colors.info,
              color: "white",
              margin: "0 auto",
              display: "block",
            }}
            submitText="Ingresar"
            isLoading={isLoading}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Row style={{ marginBottom: 16 }}>
              <FormInput<Auth>
                name="usernameOrEmail"
                rules={{
                  required: "Correo electrónico o nombre de usuario requerido",
                }}
              >
                <Input
                  type="text"
                  prefix={<Icon name="user" color="#1890ff" />}
                  placeholder="Email o usuario"
                  style={{ minWidth: 400, height: 40 }}
                />
              </FormInput>
            </Row>
            <Row style={{ marginBottom: 16 }}>
              <FormInput<Auth>
                name="password"
                rules={{
                  required: "Contraseña requerida",
                }}
              >
                <Input.Password
                  placeholder="Contraseña"
                  prefix={<Icon name="lock" color="#1890ff" />}
                  style={{ minWidth: 400, height: 40 }}
                  iconRender={(visible) =>
                    visible ? <Icon name="eyeTwoTone" /> : <Icon name="eyeInvisible" />
                  }
                />
              </FormInput>
            </Row>
          </CustomForm>
        </FlexBox>
      </FlexBox>
    </div>
  );
};
