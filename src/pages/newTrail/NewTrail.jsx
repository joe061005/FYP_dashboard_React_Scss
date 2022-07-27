import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './newTrail.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactLoading from 'react-loading';
import API from "../../Api/Api"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Modal from 'react-modal';
import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Polyline } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import Chart from '../../components/chart/Chart';
import TransportDT from '../../components/TransportDT/TransportDT';
import SimpleImageSlider from "react-simple-image-slider";
import { red } from '@mui/material/colors';
import { padding } from '@mui/system';



LoadingOverlay.propTypes = undefined

const myIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

const Territories = ['新界東北', '香港島', '九龍及將軍澳', '西貢', '大嶼山', '新界西北', '新界中部', '離島']


const NewTrail = () => {

    const navigate = useNavigate();

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

    const [image, setImage] = useState("")
    const [marker, setMarker] = useState("")
    const [xlabel, setXlabel] = useState("")
    const [ylabel, setYlabel] = useState("")
    const [path, setPath] = useState("")
    const [star, setStar] = useState("")
    const [distance, setDistance] = useState("")
    const [district, setDistrict] = useState("")
    const [time, setTime] = useState("")
    const [description, setDescription] = useState("")
    const [trafficStart, setTrafficStart] = useState("")
    const [trafficEnd, setTrafficEnd] = useState("")
    const [title, setTitle] = useState("")
    const [place, setPlace] = useState("")

    //const [tempTrailObj, setTempTrailObj] = useState({ image: [], marker: [{ latlong: { latitude: 0, longitude: 0 } }], star: [], time: "", trafficStart: [], trafficEnd: [], xlabel: [], ylabel: [] })

    const [tempTrailObj, setTempTrailObj] = useState({
        image: ["https://i0.wp.com/follo3me.com/wp-content/uploads/2015/09/special006-051.jpg?fit=3528%2C2228",
            "https://i0.wp.com/follo3me.com/wp-content/uploads/2015/09/special006-101.jpg",
            "https://i0.wp.com/follo3me.com/wp-content/uploads/2015/09/special006-091.jpg",
            "https://i0.wp.com/follo3me.com/wp-content/uploads/2015/09/special006-16.jpg",
            "https://i0.wp.com/follo3me.com/wp-content/uploads/2015/09/special006-061.jpg"
        ], marker: [
            {
                latlong: { latitude: 22.2547690, longitude: 114.2887900 },
                title: "南堂碼頭"
            },

            {
                latlong: { latitude: 22.253022384244332, longitude: 114.28287375970899 },
                title: "石刻"
            },

            {
                latlong: { latitude: 22.243061500333326, longitude: 114.28725079588725 },
                title: "鹿頸灣"
            },

            {
                latlong: { latitude: 22.24935919464984, longitude: 114.28958621836796 },
                title: "南堂頂"
            },

            {
                latlong: { latitude: 22.254834591710548, longitude: 114.297074645843 },
                title: "東龍炮台"
            },

            {
                latlong: { latitude: 22.254938053862816, longitude: 114.29193545491006 },
                title: "上角頂"
            },
            {
                latlong: { latitude: 22.25853506747724, longitude: 114.29606380385451 },
                title: "佛堂門燈塔"
            },



            {
                latlong: { latitude: 22.2584893, longitude: 114.2931542 },
                title: "北碼頭"
            },
        ], star: [1, 1, 1, 0, 0], time: "3.30", trafficStart: [
            { number: "街渡", route: "西灣河 ⇔ 東龍島", destination: "東龍島", remark: "" },
            { number: "街渡", route: "三家村 ⇔ 東龍島", destination: "東龍島", remark: "" },
        ], trafficEnd: [
            { number: "街渡", route: "西灣河 ⇔ 東龍島", destination: "東龍島", remark: "" },
            { number: "街渡", route: "三家村 ⇔ 東龍島", destination: "東龍島", remark: "" },
        ],
        title: "東龍島",
        place: "東龍島",

        xlabel: [0.00, 0.06, 0.07, 0.09, 0.13, 0.14, 0.18, 0.21, 0.25, 0.26, 0.31, 0.35, 0.40, 0.43, 0.47, 0.48, 0.51, 0.54, 0.56, 0.57, 0.59, 0.62, 0.70, 0.72, 0.74, 0.75, 0.78, 0.80, 0.82, 0.87, 0.89, 0.94, 0.97, 0.98, 1.00, 1.01, 1.03, 1.04, 1.07, 1.11, 1.13, 1.14, 1.15, 1.19, 1.20, 1.21, 1.23, 1.26, 1.30, 1.31, 1.32, 1.34, 1.35, 1.37, 1.39, 1.44, 1.47, 1.49, 1.50, 1.52, 1.54, 1.57, 1.58, 1.60, 1.61, 1.63, 1.65, 1.67, 1.69, 1.71, 1.73, 1.75, 1.76, 1.79, 1.83, 1.85, 1.88, 1.89, 1.92, 1.96, 1.97, 1.99, 2.07, 2.08, 2.10, 2.12, 2.14, 2.15, 2.18, 2.20, 2.24, 2.28, 2.31, 2.33, 2.36, 2.38, 2.40, 2.46, 2.48, 2.51, 2.53, 2.59, 2.63, 2.71, 2.75, 2.79, 2.83, 2.85, 2.87, 2.88, 2.91, 2.93, 2.96, 3.00, 3.04, 3.06, 3.09, 3.13, 3.21, 3.26, 3.30, 3.34, 3.38, 3.40, 3.47, 3.51, 3.55, 3.59, 3.65, 3.67, 3.73, 3.78, 3.84, 3.85, 3.88, 3.93, 3.95, 3.98, 4.00, 4.03, 4.07, 4.15, 4.17, 4.19, 4.22, 4.25, 4.27, 4.29, 4.31, 4.32, 4.34, 4.37, 4.39, 4.42, 4.45, 4.48, 4.50, 4.53, 4.55, 4.58, 4.61, 4.64, 4.66, 4.67, 4.69, 4.74, 4.76, 4.81, 4.84, 4.89, 4.91, 4.93, 4.98, 5.00, 5.02, 5.05, 5.07, 5.14, 5.16, 5.18, 5.20, 5.21, 5.27, 5.28, 5.30, 5.32, 5.34, 5.39, 5.41, 5.42, 5.44, 5.48, 5.49, 5.51, 5.55, 5.58, 5.59, 5.60, 5.61, 5.65, 5.67, 5.68, 5.71, 5.72, 5.74, 5.76, 5.77, 5.78, 5.81, 5.84, 5.87, 5.88, 5.91, 5.96, 5.98, 5.99, 6.03, 6.06, 6.07, 6.09, 6.13, 6.14, 6.16, 6.18, 6.21, 6.22, 6.24, 6.25, 6.27, 6.29, 6.31, 6.32, 6.34, 6.37, 6.38, 6.39, 6.41, 6.44, 6.45, 6.47, 6.48, 6.50, 6.53, 6.54, 6.59, 6.62, 6.65, 6.71, 6.74, 6.75, 6.76, 6.83, 6.85, 6.90, 6.92, 6.95, 6.99, 7.01, 7.03, 7.04, 7.05, 7.08, 7.10, 7.14, 7.17, 7.24, 7.25, 7.26, 7.29, 7.35, 7.38, 7.40, 7.42, 7.45, 7.48, 7.50, 7.52, 7.55, 7.57, 7.64]
        , ylabel: [3.00, 4.50, 4.90, 5.10, 5.30, 5.40, 5.50, 6.30, 8.70, 9.30, 9.30, 8.10, 6.60, 4.40, 4.80, 5.40, 8.40, 11.20, 14.00, 16.50, 21.50, 26.50, 41.60, 42.80, 45.20, 46.40, 51.10, 53.90, 54.80, 59.00, 60.30, 64.10, 63.60, 63.00, 62.40, 61.40, 60.10, 58.70, 53.00, 43.00, 39.60, 36.30, 32.40, 0.00, 0.00, 0.00, 0.00, 0.00, 6.00, 9.10, 11.70, 13.80, 15.70, 17.30, 22.40, 32.40, 44.00, 47.80, 50.70, 53.50, 58.20, 61.10, 62.60, 64.00, 65.50, 66.90, 67.80, 69.00, 69.70, 70.50, 71.00, 71.20, 71.40, 73.80, 77.40, 80.40, 83.10, 84.20, 86.20, 88.20, 88.70, 89.20, 93.90, 94.00, 94.80, 95.90, 96.50, 97.00, 98.70, 100.10, 102.90, 104.30, 104.30, 104.30, 104.60, 104.80, 103.60, 98.60, 96.30, 94.00, 89.00, 76.40, 70.20, 64.80, 65.30, 72.80, 77.70, 78.50, 81.00, 83.50, 88.20, 92.60, 98.40, 103.50, 108.30, 109.90, 115.90, 122.40, 135.40, 144.60, 150.30, 152.70, 155.40, 157.50, 162.00, 166.00, 171.90, 183.00, 190.90, 192.20, 198.20, 197.00, 193.40, 192.80, 191.90, 191.50, 191.30, 195.00, 200.40, 200.90, 203.40, 208.00, 209.10, 210.80, 209.30, 208.70, 208.50, 206.80, 206.80, 206.80, 207.10, 208.10, 209.30, 207.40, 207.60, 206.80, 205.10, 203.40, 200.30, 195.50, 186.90, 178.50, 175.20, 172.60, 168.10, 155.40, 151.30, 140.20, 131.80, 118.80, 115.20, 108.70, 97.80, 92.90, 89.60, 81.00, 75.50, 62.70, 58.30, 56.00, 53.70, 51.40, 38.10, 33.90, 29.70, 26.00, 22.70, 17.20, 9.71, 10.00, 10.00, 9.34, 9.34, 9.91, 11.24, 12.83, 13.58, 13.27, 13.05, 10.07, 6.74, 8.82, 9.36, 11.08, 13.05, 13.27, 13.58, 12.83, 11.24, 9.91, 9.34, 9.34, 10.00, 6.99, 6.16, 5.69, 7.89, 10.36, 11.00, 12.23, 13.66, 12.83, 10.20, 9.39, 7.92, 8.80, 8.92, 8.50, 7.73, 6.50, 5.95, 5.40, 4.14, 5.02, 5.95, 6.50, 7.37, 8.50, 8.92, 8.80, 7.92, 8.83, 10.20, 12.26, 14.89, 14.38, 16.00, 24.19, 30.04, 30.77, 31.98, 37.88, 41.59, 49.18, 53.84, 60.63, 69.96, 64.74, 63.24, 60.81, 58.50, 53.84, 49.18, 42.62, 37.88, 31.98, 30.77, 30.04, 24.19, 16.00, 14.38, 14.89, 13.68, 11.10, 7.57, 7.09, 8.79, 5.50, 5.02, 0.00]
        , path: [{ latitude: 22.2547690, longitude: 114.2887900 }, { latitude: 22.2544430, longitude: 114.2892290 }, { latitude: 22.2543320, longitude: 114.2891830 }, { latitude: 22.2543780, longitude: 114.2893750 }, { latitude: 22.2546680, longitude: 114.2894900 }, { latitude: 22.2546400, longitude: 114.2895830 }, { latitude: 22.2542290, longitude: 114.2897170 }, { latitude: 22.2540230, longitude: 114.2897310 }, { latitude: 22.2537980, longitude: 114.2893590 }, { latitude: 22.2538040, longitude: 114.2892540 }, { latitude: 22.2536140, longitude: 114.2889090 }, { latitude: 22.2536570, longitude: 114.2884900 }, { latitude: 22.2534880, longitude: 114.2879980 }, { latitude: 22.2534770, longitude: 114.2876940 }, { latitude: 22.2532910, longitude: 114.2874530 }, { latitude: 22.2531960, longitude: 114.2874120 }, { latitude: 22.2530400, longitude: 114.2871390 }, { latitude: 22.2530210, longitude: 114.2869060 }, { latitude: 22.2531050, longitude: 114.2867340 }, { latitude: 22.2530850, longitude: 114.2866150 }, { latitude: 22.2531450, longitude: 114.2864020 }, { latitude: 22.2532440, longitude: 114.2861490 }, { latitude: 22.2529430, longitude: 114.2854870 }, { latitude: 22.2528320, longitude: 114.2853370 }, { latitude: 22.2526630, longitude: 114.2852570 }, { latitude: 22.2525630, longitude: 114.2851590 }, { latitude: 22.2523840, longitude: 114.2849750 }, { latitude: 22.2522360, longitude: 114.2848750 }, { latitude: 22.2521030, longitude: 114.2848220 }, { latitude: 22.2517220, longitude: 114.2844850 }, { latitude: 22.2516370, longitude: 114.2843370 }, { latitude: 22.2521020, longitude: 114.2842660 }, { latitude: 22.2523040, longitude: 114.2841360 }, { latitude: 22.2522750, longitude: 114.2840280 }, { latitude: 22.2523350, longitude: 114.2838760 }, { latitude: 22.2522710, longitude: 114.2837330 }, { latitude: 22.2523380, longitude: 114.2836380 }, { latitude: 22.2523270, longitude: 114.2835240 }, { latitude: 22.2525230, longitude: 114.2833250 }, { latitude: 22.2527260, longitude: 114.2830450 }, { latitude: 22.2528570, longitude: 114.2829480 }, { latitude: 22.2529850, longitude: 114.2829810 }, { latitude: 22.2530490, longitude: 114.2829120 }, { latitude: 22.2530490, longitude: 114.2829120 }, { latitude: 22.2529850, longitude: 114.2829810 }, { latitude: 22.2528570, longitude: 114.2829480 }, { latitude: 22.2527260, longitude: 114.2830450 }, { latitude: 22.2525230, longitude: 114.2833250 }, { latitude: 22.2523270, longitude: 114.2835240 }, { latitude: 22.2523380, longitude: 114.2836380 }, { latitude: 22.2522710, longitude: 114.2837330 }, { latitude: 22.2523350, longitude: 114.2838760 }, { latitude: 22.2522750, longitude: 114.2840280 }, { latitude: 22.2523040, longitude: 114.2841360 }, { latitude: 22.2521020, longitude: 114.2842660 }, { latitude: 22.2517130, longitude: 114.2843130 }, { latitude: 22.2514110, longitude: 114.2842520 }, { latitude: 22.2513140, longitude: 114.2842490 }, { latitude: 22.2511640, longitude: 114.2841600 }, { latitude: 22.2510630, longitude: 114.2841410 }, { latitude: 22.2508470, longitude: 114.2840770 }, { latitude: 22.2506550, longitude: 114.2839670 }, { latitude: 22.2505880, longitude: 114.2838420 }, { latitude: 22.2504770, longitude: 114.2837730 }, { latitude: 22.2503940, longitude: 114.2836840 }, { latitude: 22.2502470, longitude: 114.2836250 }, { latitude: 22.2500390, longitude: 114.2836030 }, { latitude: 22.2498500, longitude: 114.2836380 }, { latitude: 22.2496920, longitude: 114.2836150 }, { latitude: 22.2495370, longitude: 114.2836600 }, { latitude: 22.2493460, longitude: 114.2836160 }, { latitude: 22.2491810, longitude: 114.2836460 }, { latitude: 22.2490510, longitude: 114.2836180 }, { latitude: 22.2488890, longitude: 114.2837670 }, { latitude: 22.2485870, longitude: 114.2840080 }, { latitude: 22.2484710, longitude: 114.2842190 }, { latitude: 22.2482890, longitude: 114.2843480 }, { latitude: 22.2482410, longitude: 114.2844940 }, { latitude: 22.2481010, longitude: 114.2846530 }, { latitude: 22.2477470, longitude: 114.2848100 }, { latitude: 22.2476300, longitude: 114.2848080 }, { latitude: 22.2474630, longitude: 114.2849040 }, { latitude: 22.2468500, longitude: 114.2851390 }, { latitude: 22.2467470, longitude: 114.2851370 }, { latitude: 22.2465430, longitude: 114.2852300 }, { latitude: 22.2463760, longitude: 114.2852690 }, { latitude: 22.2462740, longitude: 114.2852210 }, { latitude: 22.2461740, longitude: 114.2852490 }, { latitude: 22.2458890, longitude: 114.2852270 }, { latitude: 22.2457040, longitude: 114.2852600 }, { latitude: 22.2453790, longitude: 114.2851170 }, { latitude: 22.2450270, longitude: 114.2850950 }, { latitude: 22.2447800, longitude: 114.2851940 }, { latitude: 22.2445710, longitude: 114.2852050 }, { latitude: 22.2443450, longitude: 114.2852530 }, { latitude: 22.2442200, longitude: 114.2853920 }, { latitude: 22.2441310, longitude: 114.2856080 }, { latitude: 22.2437390, longitude: 114.2859100 }, { latitude: 22.2435900, longitude: 114.2861240 }, { latitude: 22.2434900, longitude: 114.2863820 }, { latitude: 22.2433210, longitude: 114.2864890 }, { latitude: 22.2431720, longitude: 114.2870360 }, { latitude: 22.2430930, longitude: 114.2873580 }, { latitude: 22.2427420, longitude: 114.2880250 }, { latitude: 22.2428110, longitude: 114.2883790 }, { latitude: 22.2429940, longitude: 114.2887880 }, { latitude: 22.2431110, longitude: 114.2891510 }, { latitude: 22.2432200, longitude: 114.2892200 }, { latitude: 22.2433480, longitude: 114.2890940 }, { latitude: 22.2434680, longitude: 114.2890500 }, { latitude: 22.2436630, longitude: 114.2889370 }, { latitude: 22.2437860, longitude: 114.2887560 }, { latitude: 22.2440560, longitude: 114.2886390 }, { latitude: 22.2443850, longitude: 114.2886970 }, { latitude: 22.2446970, longitude: 114.2885470 }, { latitude: 22.2447810, longitude: 114.2883810 }, { latitude: 22.2446770, longitude: 114.2880850 }, { latitude: 22.2449630, longitude: 114.2878170 }, { latitude: 22.2452150, longitude: 114.2871440 }, { latitude: 22.2456580, longitude: 114.2870370 }, { latitude: 22.2458970, longitude: 114.2868080 }, { latitude: 22.2462810, longitude: 114.2866300 }, { latitude: 22.2465680, longitude: 114.2867160 }, { latitude: 22.2465430, longitude: 114.2869580 }, { latitude: 22.2471530, longitude: 114.2872270 }, { latitude: 22.2473180, longitude: 114.2875630 }, { latitude: 22.2475650, longitude: 114.2876920 }, { latitude: 22.2478610, longitude: 114.2879470 }, { latitude: 22.2482830, longitude: 114.2882750 }, { latitude: 22.2484480, longitude: 114.2883350 }, { latitude: 22.2488300, longitude: 114.2887430 }, { latitude: 22.2492950, longitude: 114.2888030 }, { latitude: 22.2498740, longitude: 114.2888300 }, { latitude: 22.2499270, longitude: 114.2889180 }, { latitude: 22.2498050, longitude: 114.2891860 }, { latitude: 22.2495280, longitude: 114.2895180 }, { latitude: 22.2493710, longitude: 114.2896490 }, { latitude: 22.2492120, longitude: 114.2897800 }, { latitude: 22.2490710, longitude: 114.2899210 }, { latitude: 22.2492790, longitude: 114.2901160 }, { latitude: 22.2491260, longitude: 114.2904750 }, { latitude: 22.2486940, longitude: 114.2910760 }, { latitude: 22.2486130, longitude: 114.2912580 }, { latitude: 22.2486100, longitude: 114.2914570 }, { latitude: 22.2487250, longitude: 114.2917510 }, { latitude: 22.2485740, longitude: 114.2919260 }, { latitude: 22.2485310, longitude: 114.2920920 }, { latitude: 22.2483920, longitude: 114.2922620 }, { latitude: 22.2482550, longitude: 114.2923210 }, { latitude: 22.2481940, longitude: 114.2924350 }, { latitude: 22.2481140, longitude: 114.2925840 }, { latitude: 22.2481570, longitude: 114.2928620 }, { latitude: 22.2483160, longitude: 114.2929690 }, { latitude: 22.2484550, longitude: 114.2932270 }, { latitude: 22.2483130, longitude: 114.2935070 }, { latitude: 22.2485250, longitude: 114.2936020 }, { latitude: 22.2487730, longitude: 114.2936020 }, { latitude: 22.2488820, longitude: 114.2938060 }, { latitude: 22.2488290, longitude: 114.2940110 }, { latitude: 22.2490690, longitude: 114.2940850 }, { latitude: 22.2493270, longitude: 114.2941500 }, { latitude: 22.2495490, longitude: 114.2942770 }, { latitude: 22.2496820, longitude: 114.2943770 }, { latitude: 22.2497930, longitude: 114.2944600 }, { latitude: 22.2499950, longitude: 114.2944770 }, { latitude: 22.2503700, longitude: 114.2943930 }, { latitude: 22.2505600, longitude: 114.2944380 }, { latitude: 22.2509410, longitude: 114.2943090 }, { latitude: 22.2512240, longitude: 114.2942960 }, { latitude: 22.2516780, longitude: 114.2940930 }, { latitude: 22.2517720, longitude: 114.2941160 }, { latitude: 22.2519750, longitude: 114.2942260 }, { latitude: 22.2522070, longitude: 114.2945630 }, { latitude: 22.2524040, longitude: 114.2945600 }, { latitude: 22.2525410, longitude: 114.2946680 }, { latitude: 22.2528070, longitude: 114.2947400 }, { latitude: 22.2529400, longitude: 114.2948940 }, { latitude: 22.2535210, longitude: 114.2949620 }, { latitude: 22.2537510, longitude: 114.2949730 }, { latitude: 22.2538780, longitude: 114.2948790 }, { latitude: 22.2539960, longitude: 114.2949520 }, { latitude: 22.2541430, longitude: 114.2949730 }, { latitude: 22.2544430, longitude: 114.2952060 }, { latitude: 22.2545650, longitude: 114.2951570 }, { latitude: 22.2547350, longitude: 114.2951410 }, { latitude: 22.2548250, longitude: 114.2951000 }, { latitude: 22.2550250, longitude: 114.2951430 }, { latitude: 22.2553480, longitude: 114.2954380 }, { latitude: 22.2555110, longitude: 114.2954949 }, { latitude: 22.2556308, longitude: 114.2955378 }, { latitude: 22.2558148, longitude: 114.2955248 }, { latitude: 22.2556268, longitude: 114.2958018 }, { latitude: 22.2556588, longitude: 114.2959138 }, { latitude: 22.2555348, longitude: 114.2960888 }, { latitude: 22.2555568, longitude: 114.2964628 }, { latitude: 22.2553818, longitude: 114.2965948 }, { latitude: 22.2553318, longitude: 114.2966758 }, { latitude: 22.2552248, longitude: 114.2967638 }, { latitude: 22.2552598, longitude: 114.2968938 }, { latitude: 22.2549868, longitude: 114.2969868 }, { latitude: 22.2548210, longitude: 114.2970968 }, { latitude: 22.2548825, longitude: 114.2969808 }, { latitude: 22.2550865, longitude: 114.2970565 }, { latitude: 22.2550590, longitude: 114.2969622 }, { latitude: 22.2552598, longitude: 114.2968938 }, { latitude: 22.2552248, longitude: 114.2967638 }, { latitude: 22.2553318, longitude: 114.2966758 }, { latitude: 22.2553818, longitude: 114.2965948 }, { latitude: 22.2555568, longitude: 114.2964628 }, { latitude: 22.2555348, longitude: 114.2960888 }, { latitude: 22.2556588, longitude: 114.2959138 }, { latitude: 22.2556268, longitude: 114.2958018 }, { latitude: 22.2558148, longitude: 114.2955248 }, { latitude: 22.2561688, longitude: 114.2953478 }, { latitude: 22.2563558, longitude: 114.2953688 }, { latitude: 22.2564608, longitude: 114.2953278 }, { latitude: 22.2567468, longitude: 114.2950638 }, { latitude: 22.2569968, longitude: 114.2950018 }, { latitude: 22.2571128, longitude: 114.2950198 }, { latitude: 22.2572248, longitude: 114.2949798 }, { latitude: 22.2575238, longitude: 114.2947508 }, { latitude: 22.2575808, longitude: 114.2946578 }, { latitude: 22.2577898, longitude: 114.2946328 }, { latitude: 22.2579118, longitude: 114.2947828 }, { latitude: 22.2580738, longitude: 114.2948918 }, { latitude: 22.2580768, longitude: 114.2950478 }, { latitude: 22.2580718, longitude: 114.2952308 }, { latitude: 22.2580998, longitude: 114.2953338 }, { latitude: 22.2581988, longitude: 114.2954928 }, { latitude: 22.2582588, longitude: 114.2957068 }, { latitude: 22.2582998, longitude: 114.2958088 }, { latitude: 22.2583568, longitude: 114.2958990 }, { latitude: 22.2585317, longitude: 114.2960451 }, { latitude: 22.2583208, longitude: 114.2959598 }, { latitude: 22.2582998, longitude: 114.2958088 }, { latitude: 22.2582588, longitude: 114.2957068 }, { latitude: 22.2582008, longitude: 114.2955728 }, { latitude: 22.2580998, longitude: 114.2953338 }, { latitude: 22.2580718, longitude: 114.2952308 }, { latitude: 22.2580768, longitude: 114.2950478 }, { latitude: 22.2580738, longitude: 114.2948918 }, { latitude: 22.2579608, longitude: 114.2948008 }, { latitude: 22.2577898, longitude: 114.2946328 }, { latitude: 22.2576268, longitude: 114.2946508 }, { latitude: 22.2572018, longitude: 114.2945088 }, { latitude: 22.2570088, longitude: 114.2944128 }, { latitude: 22.2568758, longitude: 114.2941388 }, { latitude: 22.2567958, longitude: 114.2936008 }, { latitude: 22.2567008, longitude: 114.2933028 }, { latitude: 22.2566218, longitude: 114.2932518 }, { latitude: 22.2566088, longitude: 114.2931438 }, { latitude: 22.2562808, longitude: 114.2926068 }, { latitude: 22.2560378, longitude: 114.2925958 }, { latitude: 22.2556848, longitude: 114.2924288 }, { latitude: 22.2555128, longitude: 114.2923378 }, { latitude: 22.2552648, longitude: 114.2922628 }, { latitude: 22.2550218, longitude: 114.2920019 }, { latitude: 22.2552128, longitude: 114.2919623 }, { latitude: 22.2552304, longitude: 114.2920999 }, { latitude: 22.2552971, longitude: 114.2921889 }, { latitude: 22.2553254, longitude: 114.2923038 }, { latitude: 22.2555128, longitude: 114.2923378 }, { latitude: 22.2556848, longitude: 114.2924288 }, { latitude: 22.2559978, longitude: 114.2925638 }, { latitude: 22.2562808, longitude: 114.2926068 }, { latitude: 22.2566088, longitude: 114.2931438 }, { latitude: 22.2566218, longitude: 114.2932518 }, { latitude: 22.2567008, longitude: 114.2933028 }, { latitude: 22.2567958, longitude: 114.2936008 }, { latitude: 22.2568758, longitude: 114.2941388 }, { latitude: 22.2570088, longitude: 114.2944128 }, { latitude: 22.2572018, longitude: 114.2945088 }, { latitude: 22.2573588, longitude: 114.2943968 }, { latitude: 22.2574478, longitude: 114.2942038 }, { latitude: 22.2574978, longitude: 114.2939358 }, { latitude: 22.2575968, longitude: 114.2937638 }, { latitude: 22.2576318, longitude: 114.2935248 }, { latitude: 22.2578258, longitude: 114.2932918 }, { latitude: 22.2578318, longitude: 114.2931688 }, { latitude: 22.2584893, longitude: 114.2931542 }]
    })

    const [isLoadingCreate, setIsLoadingCreate] = useState(false)
    const [showInvalidInput, setShowInvalidInput] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(true)

    const submit = async () => {
        if (!isValidFormInput()) return;

        var pathArr = path.replaceAll('[', '').replaceAll(']', ' ').split(' , ')
        pathArr = pathArr.map((path) => {
            path = path.trim().split(', ')
            return { latitude: parseFloat(path[0]), longitude: parseFloat(path[1]) }
        })

        var xlabelArr = xlabel.replaceAll('[', '').replaceAll(']', '').split(', ')
        xlabelArr = xlabelArr.map((x) => {
            return parseFloat(x)
        })

        var ylabelArr = ylabel.replaceAll('[', '').replaceAll(']', '').split(', ')
        ylabelArr = ylabelArr.map((y) => {
            return parseFloat(y)
        })

        const imageArr = image.split('\n')

        var markerArr = JSON.parse(marker.replace(/\s/g, ''))

        markerArr = markerArr.map((marker) => {
            return { latlong: { latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lon) }, title: marker.name }
        })


        var startArr = trafficStart.split('\n')

        startArr = startArr.map((startObj) => {
            const arr = startObj.split("\t")
            return { number: arr[0], route: arr[1], destination: arr[2], remark: arr[3].replace(/\s/g, '') }
        })

        var endArr = trafficEnd.split('\n')

        endArr = endArr.map((endObj) => {
            const arr = endObj.split("\t")
            return { number: arr[0], route: arr[1], destination: arr[2], remark: arr[3].replace(/\s/g, '') }
        })

        const starArr = [0, 0, 0, 0, 0]
        for (let x = 0; x < star; x++) {
            starArr.splice(x, 1, 1)
        }

        Promise.all([pathArr, xlabelArr, ylabelArr, markerArr, startArr, endArr])

        const params = {
            image: imageArr,
            marker: markerArr,
            xlabel: xlabelArr,
            ylabel: ylabelArr,
            path: pathArr,
            star: starArr,
            distance: parseInt(distance),
            district: district,
            time: time,
            description: description,
            trafficStart: startArr,
            trafficEnd: endArr,
            title: title

        }


        const trailObj = {
            _id: "N/A",
            timestamp: "N/A",
            ...params
        }

        setTempTrailObj(trailObj)

        setIsModalOpen(true)

        console.log(params);

        // setIsLoadingCreate(true)

        // await API.register(params).then(([code, data, header]) => {
        //    if (code == '200'){
        //     const userData = JSON.parse(localStorage.getItem('userData'))
        //     const newUserData = [...userData, data]
        //     localStorage.setItem('userData', JSON.stringify(newUserData))
        //   }
        // })
        // setIsLoadingCreate(false)
    }

    const isValidFormInput = () => {
        if (!(image && marker && xlabel && ylabel && path && star && distance && district && time && description && trafficStart && trafficEnd && title && place)) {
            setShowInvalidInput(true)
            return false
        }
        return true
    }

    useEffect(() => {
        console.log(tempTrailObj);
    }, [tempTrailObj])



    return (
        <LoadingOverlay
            active={isLogout}
            spinner
            text='Logout...'
        >
            <ReactJsAlert
                status={showAlert}
                type="error"
                title="Please try again later!"
                Close={() => setShowAlert(false)}
            />
            <ReactJsAlert
                status={showInvalidInput}
                type="error"
                title="Please enter all information!"
                Close={() => setShowInvalidInput(false)}
            />
            <div className="newTrail">
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="newTrailContainer">
                    <Navbar />
                    <div className="top">
                        <div className="goBackButton" onClick={() => { navigate(-1) }}>
                            <ArrowBackIosNewIcon />
                            <p className="goBackButtonText">Go Back</p>
                        </div>
                        <h1>Add New Trail</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src="https://i.pinimg.com/736x/5a/8c/3f/5a8c3feccecbc90c2ac53eef53d59c4a--logo-design-trail.jpg"
                                alt=""
                            />

                        </div>
                        <div className="right">
                            <div className="formInput">
                                <label>Territory</label>
                                <Dropdown options={Territories} onChange={(e) => setDistrict(e.value)} value={district} placeholder="Select a territory" />
                            </div>
                            <div className="formInput">
                                <label>District</label>
                                <input
                                    type="text"
                                    placeholder='District'
                                    value={place}
                                    onChange={(e) => { setPlace(e.target.value) }}
                                    className="sameHeight"
                                />
                            </div>
                            <div className="formInput">
                                <label>Trail Name</label>
                                <input
                                    type="text"
                                    placeholder='Trail Name'
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}

                                />
                            </div>
                            <div className="formInput">
                                <label>Difficulty (1-5 stars)</label>
                                <input
                                    type="text"
                                    placeholder='Star(s)'
                                    value={star}
                                    onChange={(e) => { setStar(e.target.value) }}
                                />
                            </div>
                            <div className="formInput">
                                <label>Distance (km)</label>
                                <input
                                    type="text"
                                    placeholder='Distance'
                                    value={distance}
                                    onChange={(e) => { setDistance(e.target.value) }}
                                />
                            </div>
                            <div className="formInput">
                                <label>Time (hour.minute)</label>
                                <input
                                    type="text"
                                    placeholder='Time'
                                    value={time}
                                    onChange={(e) => { setTime(e.target.value) }}
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Image URLs (URL \n ...)</label>
                                <textarea
                                    value={image}
                                    onChange={(e) => { setImage(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Paths [lat, long], ...</label>
                                <textarea
                                    value={path}
                                    onChange={(e) => { setPath(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>X Labels [..., ...]</label>
                                <textarea
                                    value={xlabel}
                                    onChange={(e) => { setXlabel(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Y Labels [..., ...]</label>
                                <textarea
                                    value={ylabel}
                                    onChange={(e) => { setYlabel(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Markers {`[{"lat": xx, ...}]`}</label>
                                <textarea
                                    value={marker}
                                    onChange={(e) => { setMarker(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Traffic info at starting point (number route destination remark \n ...)</label>
                                <textarea
                                    value={trafficStart}
                                    onChange={(e) => { setTrafficStart(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Traffic info at ending point (number route destination remark \n ...)</label>
                                <textarea
                                    value={trafficEnd}
                                    onChange={(e) => { setTrafficEnd(e.target.value) }}
                                    className="textArea"
                                />
                            </div>

                            {isLoadingCreate ?
                                <div className="loading">
                                    <ReactLoading type="spin" color="teal" />
                                </div>
                                :
                                <button onClick={() => { submit() }}>Create</button>
                            }
                        </div>
                    </div>



                    <Modal
                        isOpen={isModalOpen}
                        contentLabel="trail preview"
                        ariaHideApp={false}
                        style={{
                            overlay: {
                                zIndex: 1000,
                            },

                        }}
                    >

                        <div className="right" style={{display: 'flex', flexWrap: 'wrap', gap: 20}}>
                            <div className='detailContainer'>
                                <div className="formInput" style={{width: '50%'}}>
                                    <label>Creation Time:</label>
                                    <p className="datatext">{tempTrailObj.timestamp}</p>
                                </div>
                                <div className="formInput">
                                    <label>Trail ID:</label>
                                    <p className="datatext">{tempTrailObj._id}</p>
                                </div>
                                <div className="formInput">
                                    <label>Territory:</label>
                                    <p className="datatext">{tempTrailObj.district}</p>
                                </div>
                                <div className="formInput">
                                    <label>District:</label>
                                    <p className="datatext">{tempTrailObj.place}</p>
                                </div>
                                <div className="formInput">
                                    <label>Trail Name:</label>
                                    <p className="datatext">{tempTrailObj.title}</p>
                                </div>
                                <div className="formInput">
                                    <label>Description:</label>
                                    <p className="datatext">{tempTrailObj.description}</p>
                                </div>
                                <div className="formInput">
                                    <label>Distance (km):</label>
                                    <p className="datatext">{tempTrailObj.distance}</p>
                                </div>
                                <div className="formInput">
                                    <label>Difficulty (1-5 stars):</label>
                                    <p className="datatext">{tempTrailObj.star.filter((star) => { return star == '1' }).length}</p>
                                </div>
                                <div className="formInput">
                                    <label>Time:</label>
                                    <p className="datatext">{tempTrailObj.time.split(".")[0] == '0' ?
                                        `${tempTrailObj.time.split(".")[1]} minutes`
                                        :
                                        tempTrailObj.time.split(".")[1] == '0' ?
                                            `${tempTrailObj.time.split(".")[0]} hour(s)`
                                            :
                                            `${tempTrailObj.time.split(".")[0]} hour(s) and ${tempTrailObj.time.split(".")[1]} minutes`
                                    }</p>
                                </div>
                                <div className="imageContainer">
                                    <p>Images: </p>
                                    <SimpleImageSlider
                                        images={tempTrailObj.image}
                                        showBullets={true}
                                        showNavs={true}
                                        width={'48%'}
                                        height={500}
                                        autoPlay={true}
                                    />
                                </div>
                                {/* <div className="mapContainer" style={{ zIndex: 0 }}>
                                        <p>Map: </p>
                                        <MapContainer center={[tempTrailObj.marker[0].latlong.latitude, tempTrailObj.marker[0].latlong.longitude]} zoom={15} className="map">
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            {
                                                tempTrailObj.marker.map((marker, index) => (
                                                    <Marker position={[marker.latlong.latitude, marker.latlong.longitude]} icon={myIcon} key={index}>
                                                        <Tooltip permanent>
                                                            {index == 0 ? `起點: ${marker.title}` : index == tempTrailObj.marker.length - 1 ? `終點: ${marker.title}` : `${marker.title}`}
                                                        </Tooltip>
                                                    </Marker>
                                                ))
                                            }
                                            <Polyline pathOptions={{ color: 'black' }} positions={tempTrailObj.path} />
                                        </MapContainer>
                                    </div> */}
                                <div className="heightChartContainer">
                                    <Chart data={{ xlabel: tempTrailObj.xlabel, ylabel: tempTrailObj.ylabel }} type="trailDetail" />
                                </div>
                                <div className="transportChartContainer">
                                    <p>Transportation at the starting point:</p>
                                    <TransportDT data={tempTrailObj.trafficStart} />
                                </div>
                                <div className="transportChartContainer">
                                    <p>Transportation at the ending point:</p>
                                    <TransportDT data={tempTrailObj.trafficEnd} />
                                </div>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>
        </LoadingOverlay>
    )
}

export default NewTrail