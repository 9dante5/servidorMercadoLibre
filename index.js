import 'dotenv/config'
import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago"



const client = new MercadoPagoConfig({
    accessToken: "APP_USR-4421060147877643-101316-539d525c62c16a021eca467eb9df9dde-166428709",
});


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("soy el server :)")
})

app.post('/create_preference', async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "COP"
                },
            ]
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        res.json({
            id: result.id,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear la preferencia :(" });
    }
})

app.listen(port, () => {
    console.log(`Server corriendo en http://localhost:${port}`);
});