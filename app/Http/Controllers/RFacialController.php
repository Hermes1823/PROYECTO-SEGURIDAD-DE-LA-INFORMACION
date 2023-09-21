<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RFacialController extends Controller
{
    public function index()
    {
        return view ('reconocimientofacial');
    }
}
