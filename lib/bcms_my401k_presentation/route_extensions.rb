module BcmsMy401kPresentation::RouteExtensions
  def mount_bcms_my401k_presentation
    mount BcmsMy401kPresentation::Engine => "/bcms_my401k_presentation"
    #match '/blog/feeds', :to=>"bcms_blog/feeds#index", :defaults=>{:format => "rss"}, :as=>'blog_feeds'
  end
  
  alias :routes_for_bcms_my401k_presentation :mount_bcms_my401k_presentation
end

