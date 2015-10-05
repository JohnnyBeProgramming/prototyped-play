@echo off

call "C:\Program Files\GDAL\GDALShell.bat"

call ogr2ogr -f GeoJSON -where "iso_a3 <> \"USA\"" "data/countries.json" "resources/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp" 
call ogr2ogr -f GeoJSON "data/states.json" "resources/ne_110m_admin_1_states_provinces/ne_110m_admin_1_states_provinces.shp" 
::call sed -i "" "s/\"adm1_code\": \"USA-/\"iso_n3\":\"/" "data/states.json"  

call topojson -o data/countries-and-states.json --id-property iso_n3 --properties name=name -- data/countries.json data/states.json  


pause