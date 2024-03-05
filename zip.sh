# make a zip archive of psuedocode & flowcharts directories, name it plan.zip. convert LF to CRLF
zip -r -l plan.zip psuedocode flowcharts

# zip everything excluding node_modules
zip -r -l project.zip -x "node_modules/*" .