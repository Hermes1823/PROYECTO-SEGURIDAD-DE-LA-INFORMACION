<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}

