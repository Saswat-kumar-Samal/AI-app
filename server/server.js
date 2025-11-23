import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express'

const app = express()

app.use(cors())
app.use(express.json()) /** all the request will pass through json format */
app.use(clerkMiddleware()) /** all the request will pass through clerkMiddleware and clerk will add auth object so that we can use the user data */

app.get('/' , (req, res) => {
    res.send('server running');
})

app.use(requireAuth())   /** form this line only logged-in users can access the data , not everyone */


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})