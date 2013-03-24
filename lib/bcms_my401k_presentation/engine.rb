require 'browsercms'
module BcmsMy401kPresentation
  class Engine < ::Rails::Engine
    isolate_namespace BcmsMy401kPresentation
		include Cms::Module
  end
end
