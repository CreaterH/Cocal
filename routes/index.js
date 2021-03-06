var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Zhang Zhonghao' });
});

module.exports = router;


/**
 * <script id="template-nav_category_list" type="text/template">
                            {{each categoryList as category i}}
                            <li class="nav_category_item">
                                <div class="children_list">
                                    {{if category.categorys && category.categorys.length}}
                                    <div class="subitems">
                                        {{each category.categorys as item j}}
                                        <dl class="fore1">
                                            <dt>
                                                {{if category.categoryType!='design'}}
                                                <a href="http://www.ininin.com/search.html#keyword={{item.categoryName}}&type=6" title="{{item.categoryName}}" target="_blank">{{item.categoryName}}</a>
                                                {{else}}
                                                {{item.categoryName}}
                                                {{/if}}
                                            </dt>
                                            <dd>
                                                {{each item.products as o k}} {{if o.productId && o.targetId>0 && o.productId!=o.targetId}}
                                                <a href="http://www.ininin.com/product/{{o.targetId}}?pid={{o.productId}}" title="{{o.productName}}" target="_blank">{{o.productName}}</a>&nbsp; {{else if o.productId}}
                                                <a href="http://www.ininin.com/product/{{o.productId}}.html" title="{{o.productName}}" target="_blank">{{o.productName}}</a>&nbsp; {{/if}} {{/each}} {{each item.categorys as o k}} {{if o.categoryId}} {{if
                                                category.categoryType=='design'}}
                                                <a href="http://design.ininin.com/category/{{o.categoryId}}.html" title="{{o.categoryName}}" target="_blank">{{o.categoryName}}</a>&nbsp; {{else}}
                                                <a href="http://www.ininin.com/search.html#keyword={{o.categoryName}}&type=7" title="{{o.categoryName}}" target="_blank">{{o.categoryName}}</a>&nbsp; {{/if}} {{/if}} {{/each}}
                                            </dd>
                                        </dl>
                                        {{/each}}
                                    </div>
                                    {{/if}} {{if category.pics && category.pics.length}}
                                    <ul class="imgs">
                                        {{each category.pics as o k}}
                                        <li>
                                            <a href="{{o.picHref}}" title="{{o.title}}" target="_blank">
                                                <img class="img-loaded" src="{{o.picPath}}" alt="{{o.title}}">
                                            </a>&nbsp;
                                        </li>
                                        {{/each}}
                                    </ul>
                                    {{/if}}
                                </div>
                                <a href="javascript:;" class="nav_category_content">
                                    {{category.categoryName}}
                                    {{if !category.categoryId}}
                                    <img src="http://www.ininin.com/resources/icons/new.gif"/>
                                    {{/if}}
                                </a>
                            </li>
                            {{/each}}
                        </script>
 */