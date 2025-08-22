POST /api/data      {ts, machine_id, vibration_window?, temp_c, current_a, rpm}
GET  /api/data      ?machine_id&limit
POST /api/predict   {machine_id, use_features?}
