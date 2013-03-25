require 'browsercms'
module BcmsMy401kPresentation
  class Engine < ::Rails::Engine
		include Cms::Module
    isolate_namespace BcmsMy401kPresentation

    config.to_prepare do
      %W{Layout ErrorMessages}.each do |resource|
        Cms::ViewContext.send(:include, BcmsMy401kLibrary.module_eval("#{resource.pluralize}Helper"))
        ApplicationHelper.send(:include, BcmsMy401kLibrary.module_eval("#{resource.pluralize}Helper"))
      end
    end

    initializer 'bcms_my401k_library.route_extensions', :after => 'action_dispatch.prepare_dispatcher' do |app|
       ActionDispatch::Routing::Mapper.send :include, BcmsMy401kLibrary::RouteExtensions
    end
  end
end
