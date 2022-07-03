<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\CompanyResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller
{
    private static String $tableName = 'companies';

    public static function getTableName(): string
    {
        return self::$tableName;
    }

    public function index(Request $request)
    {
        return CompanyResource::collection(Company::paginate());
    }
    public function show($id)
    {
        return new CompanyResource(Company::findOrFail($id));
    }
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|max:255',
            'status' => 'required|in:trial,customer,dead',
            'address' => 'required|max:1024',
            'created_at' => 'required|date',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $preparedData = $input;
        $preparedData['created_at'] = Carbon::parse($input['created_at']);
        Log::info("data", $preparedData);
        $company = Company::create($preparedData);

        return response()->json(new CompanyResource($company), 201);
    }
    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|max:255',
            'status' => 'required|in:trial,customer,dead',
            'address' => 'required|max:1024',
            'created_at' => 'required|date',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $preparedData = $input;
        $preparedData['created_at'] = Carbon::parse($input['created_at']);
        $result = Company::find($id)->update($preparedData);

        return response()->json([ "result" => $result ], 200);
    }
    public function destroy(Request $request, $id)
    {
        Company::find($id)->delete();
        return CompanyResource::collection(Company::paginate());
    }
}
