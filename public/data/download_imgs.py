import simple_image_download.simple_image_download as simp
import pandas as pd

my_downloader = simp.Downloader()

# Get List of Saved URLs in cache
print(my_downloader.get_urls())

# Prints the Whole Cache
print(my_downloader.cached_urls)

# Download + search file
#my_downloader.download('Temple of Apollo Aigeira', limit=2)

# Now donwload all the Searched picture
##my_downloader.download(download_cache=True)

# Flush cache
#my_downloader.flush_cache()
roman = pd.read_csv("monuments_cities.csv",sep=';', encoding='ISO-8859-1')
for i,row in roman.iterrows():
    key = row["CityName"]
    my_downloader.directory = 'imgs/'+key+'/'
    my_downloader.extensions = '.jpg'
    print(my_downloader.extensions)
    try:
        my_downloader.download(row["CityName"]+'-'+row["Structure"]+'-'+'-roman', limit=1, verbose=True)
    except:
        pass
    my_downloader.flush_cache()
