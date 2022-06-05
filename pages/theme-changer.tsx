import { ChangeEvent, FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Layout } from '../components/layouts/Layout';

interface Props {
  theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(event.target.value);

    Cookies.set('theme', event.target.value);
  };

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value='light'
                control={<Radio />}
                label='Light'
              />

              <FormControlLabel value='dark' control={<Radio />} label='Dark' />

              <FormControlLabel
                value='custom'
                control={<Radio />}
                label='Custom'
              />
            </RadioGroup>
          </FormControl>

          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = 'light' } = req.cookies;

  const validTheme = ['light', 'dark', 'custom'];

  return {
    props: { theme: validTheme.includes(theme) ? theme : 'dark' }
  };
};

export default ThemeChangerPage;
